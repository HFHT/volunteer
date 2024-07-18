import { useEffect, useMemo, useState } from "react"

import { Header, Navbar } from "./components"
import { useOnline } from "./hooks"
import { AppShell, Box, Flex, LoadingOverlay, Text } from "@mantine/core";
import RouterSwitcher from "./RouterSwitcher";
import { notifications } from "@mantine/notifications";

interface MainI {
    props: propsT
}

export function Main({ props }: MainI) {
    const isOnline = useOnline({});
    // const [opened, { toggle }] = useDisclosure();
    console.log(props)
    const [_constituent, set_Constituent] = useState<constituentT | null>(null)
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        if (props.coords.errMsg) {
            notifications.show(props.coords.errMsg)
        }
    }, [])

    // const [refreshSchedule, updateSchedule, isFetching] = useMongo({ connection: { url: import.meta.env.VITE_MONGO_URL, collection: 'Schedule', key: '_id' }, setter: set_Constituent, noSave: params.nosave })
    // const [doSaveStop, hasError, isSaving] = useSaveConstituent('2024-05-28', updateSchedule, toast)

    // const activities = useMemo(() => find_row('_id', 'activities', props.settings), [props.settings])

    return (
        <div className="App">
            <AppShell
                header={{ height: 55 }}
                navbar={{ width: 120, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                padding={{ base: 'xs', sm: 'sm', lg: 'xl' }}
            >
                <Header opened={opened} setOpened={(e: any) => setOpened(e)} />
                <Navbar close={() => setOpened(false)} />
                <AppShell.Main>
                    <Box pos='relative'>
                        <LoadingOverlay visible={!isOnline} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ size: 'xl', color: 'pink', type: 'bars' }} />
                        <RouterSwitcher props={props} />
                    </Box>
                </AppShell.Main>
                <AppShell.Footer zIndex={opened ? 'auto' : 201}>
                    <Flex justify="center">
                        <Text size="xs">Copyright<span>&copy;</span> Habitat for Humanity Tucson 2024</Text>
                    </Flex>
                </AppShell.Footer>
            </AppShell>
        </div>
    )
}