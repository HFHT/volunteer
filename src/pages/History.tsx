import { Box, Flex, Grid, LoadingOverlay, Tooltip } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useConstituent, useOnline, useParams, useVolunteerHours } from "../hooks";
import { notifications } from "@mantine/notifications";
import { CSVLink } from "react-csv";

import { formatHistoryHours } from "../helpers";
import { YearTabs } from "../components";
import { IconDownload } from "@tabler/icons-react";

interface HistoryInterface {
    props: propsT
}

export function History({ props }: HistoryInterface) {
    const params = useParams(['nosave', 'noemail']) // noprint: do not print hang tags; noprice: do not reprice items
    const isOnline = useOnline({
        online: [() => { notifications.show({ color: 'green', title: '🛜 Network Restored', message: 'You are back online! ' }) }],
        offline: [() => { notifications.show({ color: 'red', title: '❗ Network Error', message: 'Connection to the network has been lost! ' }) }]
    })

    const [constituent] = useConstituent(props, false)

    const [hours, , fetchHours, , isBusyV] = useVolunteerHours({ _id: constituent.info?._id, connection: { url: import.meta.env.VITE_MONGO_URL, collection: 'Hours', key: '_id' }, noSave: params.nosave })

    const formattedHours = useMemo(() => formatHistoryHours(hours), [hours])

    useEffect(() => {
        console.log(formattedHours)
    }, [formattedHours])

    useEffect(() => {
        !hours && fetchHours(constituent.info?._id)
    }, [])

    return (
        <Box pos="relative">
            <Grid grow>
                <Grid.Col span={6}>
                    <h2>Your History</h2>
                </Grid.Col>
                <Grid.Col span={1}>
                    <CSVLink data={csvHours(hours)} filename={'HabitatVolunteerHours.csv'} className='csvlink'>
                        <Tooltip label="Download your History.">
                            <IconDownload />
                        </Tooltip>
                    </CSVLink>
                </Grid.Col>
            </Grid>
            <LoadingOverlay visible={isBusyV || !isOnline} />
            <YearTabs hours={formattedHours} />
        </Box>
    )
}
function csvHours(hoursHistory: hoursT[] | undefined) {
    if (!hoursHistory) return []
    let csv = [['Date', 'Activity', 'Location', 'In', 'Out', 'Hours', 'Miles', 'Event']]
    //@ts-ignore
    hoursHistory.sort((a, b): any => new Date(b.day) - new Date(a.day)).forEach((h: hoursT) => {
        csv.push([h.day, h.act, h.loc, h.in, h.out, h.dur.toString(), (h.miles).toString(), ''])
    })
    return csv
}