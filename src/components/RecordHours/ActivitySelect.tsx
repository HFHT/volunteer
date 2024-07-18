import { Grid, NativeSelect } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"

interface ActivitySelectInterface {
    activities: string[]
    selected: [string, Function]
}
export function ActivitySelect({ activities, selected }: ActivitySelectInterface) {
    return (
        <Grid >
            <Grid.Col span={11} >
                <NativeSelect value={selected[0]}
                    onChange={(e: any) => selected[1](e.target.value)}
                    data={activities && activities.map((p: string, pi: number) => p)}
                />
            </Grid.Col>
            <Grid.Col span={1}>
                <div className='button' onClick={() => { alert('Add activity coming soon.') }}><IconCirclePlus /></div>
            </Grid.Col>
        </Grid>
    )
}