import { Box, Button, Divider, Grid, Group, LoadingOverlay, NumberInput, Slider, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useOnline, useParams, useVolunteerHours } from "../../hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { dateFormat, timeAdd, timeDiff, timeFormat } from "../../helpers";
import { LocationSelect } from "./LocationSelect";
import { ActivitySelect, TimePicker } from "..";
import { DateInput } from "@mantine/dates";

interface RecordTimeInterface {
  constituent: any
  refreshActivities: Function
}
export function RecordTime({ constituent, refreshActivities }: RecordTimeInterface) {
  const params = useParams(['nosave', 'noemail']) // noprint: do not print hang tags; noprice: do not reprice items

  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const isOnline = useOnline({
    online: [() => { notifications.show({ color: 'green', title: '🛜 Network Restored', message: 'You are back online! ' }) }],
    offline: [() => { notifications.show({ color: 'red', title: '❗ Network Error', message: 'Connection to the network has been lost! ' }) }]
  })
  const [_formFields, set_FormFields] = useState({ location: '', activity: '', date: dateFormat(null), time: timeFormat(null), hours: 0 })
  const [hours, openRecord, fetchHours, updateHours, isBusyV] = useVolunteerHours({ _id: constituent.info?._id, connection: { url: import.meta.env.VITE_MONGO_URL, collection: 'Hours', key: '_id' }, noSave: params.nosave })

  const handleCheckIn = () => {
    console.log('handleCheckIn', hours, constituent)
    if (!hours) return
    if (formHasErrors(_formFields)) return
    let allHours = [...hours, {
      day: _formFields.date,
      act: _formFields.activity,
      loc: _formFields.location,
      in: _formFields.time,
      out: '',
      dur: 0,
      miles: 0,
      ev: ''
    }]
    updateHours(constituent.info?._id, allHours)
  }
  const handleCheckOut = () => {
    if (!hours) return
    if (_formFields.time === '') {
      notifications.show({ color: 'red', title: '🛜 A time is required!', message: '' })
      return true
    }
    let checkOutHours = { ...openRecord!.r, out: timeAdd(openRecord!.r.in, _formFields.hours), dur: _formFields.hours, miles: 0 }
    let allHours = hours
    console.log(timeAdd(openRecord!.r.in, _formFields.hours))
    allHours[openRecord!.idx] = checkOutHours
    updateHours(constituent.info?._id, allHours)
    set_FormFields({ location: '', activity: '', date: dateFormat(null), time: timeFormat(null), hours: 0 })
    refreshActivities()
  }
  const handleRefresh = () => {
    let dur = openRecord ? timeDiff(openRecord.r.in, null) : 0
    set_FormFields({ ..._formFields, date: dateFormat(null), time: timeFormat(null), hours: dur })
  }
  const formHasErrors = (theForm: any) => {
    console.log('formHasErrors', theForm)
    if (theForm.location === '') {
      notifications.show({ color: 'red', title: '🛜 A location is required!', message: '' })
      return true
    }
    if (theForm.activity === '') {
      notifications.show({ color: 'red', title: '🛜 An activity is required!', message: '' })
      return true
    }
    if (theForm.date === '') {
      notifications.show({ color: 'red', title: '🛜 A date is required!', message: '' })
      return true
    }
    if (theForm.time === '') {
      notifications.show({ color: 'red', title: '🛜 A time is required!', message: '' })
      return true
    }
    return false
  }
  useEffect(() => {
    console.log('openRecord-useEffect', hours, constituent, openRecord)
    if (openRecord !== null) {
      console.log('openRecord-notnull', openRecord)
      set_FormFields({
        location: openRecord.r.loc,
        activity: openRecord.r.act,
        date: openRecord.r.day,
        time: timeFormat(null),
        hours: timeDiff(openRecord.r.in, null)
      })
    }
    !hours && fetchHours(constituent.info?._id)
  }, [openRecord])

  useEffect(() => {
    console.log(constituent)
    if (!constituent || constituent.locations.length === 0) return
    set_FormFields({ ..._formFields, location: constituent.locations[0].title, activity: constituent.activities[0] })
  }, [constituent])

  return (
    <>
      <h2>Record Time</h2>
      <Group justify="space-between" gap="xs" grow>
        <Button size={mobile ? "sm" : "sm"} radius="xs" onClick={handleCheckIn} disabled={openRecord !== null}>Check In</Button>
        <Button size={mobile ? "sm" : "sm"} radius="xs" onClick={handleCheckOut} disabled={openRecord === null}>Check Out</Button>
        <Button size={mobile ? "sm" : "sm"} radius="xs" onClick={handleRefresh} disabled={false}>Refresh</Button>
      </Group>
      <Divider my="sm" />
      <Box pos="relative">
        <LoadingOverlay visible={isBusyV || !isOnline} />
        <Group justify="space-between" gap="xs" grow className="pad-below">
          <DateInput value={new Date(_formFields.date)} onChange={(e: any) => set_FormFields({ ..._formFields, date: e })} />
          <TimePicker value={_formFields.time} onChange={(e: any) => set_FormFields({ ..._formFields, time: e })} />
        </Group>
        <LocationSelect locations={constituent.locations} selected={[_formFields.location, (e: any) => set_FormFields({ ..._formFields, location: e })]} />
        <ActivitySelect activities={constituent.activities} selected={[_formFields.activity, (e: any) => set_FormFields({ ..._formFields, activity: e })]} />
        <h3>Hours</h3>
        <Grid grow>
          <Grid.Col span={1}>
            <NumberInput value={_formFields.hours} min={0} max={24} step={0.25}
              onChange={(e: any) => set_FormFields({ ..._formFields, hours: e })}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Slider
              onChange={(e: any) => set_FormFields({ ..._formFields, hours: e })}
              defaultValue={0}
              value={_formFields.hours}
              min={0}
              max={24}
              step={0.25}
              marks={[{ value: 4, label: '4' }, { value: 8, label: '8' }, { value: 12, label: '12' }, { value: 16, label: '16' }]}
            />
          </Grid.Col>
        </Grid>
        <Divider my="sm" />
      </Box>
    </>
  )
}
