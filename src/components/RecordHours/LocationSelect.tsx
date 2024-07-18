import { Grid, NativeSelect } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"

interface LocationSelectInterface {
    locations: locT[]
    selected: [string, Function]
}
export function LocationSelect({ locations, selected }: LocationSelectInterface) {
    const optionTitle = (loc: locT) => {
        return `${loc.title} (${(loc.distance && loc.distance > 99) ? '--' : `${loc.distance} miles`})`
    }
    return (
        <Grid >
            <Grid.Col span={11} >
                <NativeSelect value={selected[0]}
                    onChange={(e: any) => selected[1](e.target.value)}
                    data={locations && locations.map((l: locT) => optionTitle(l))}
                />
            </Grid.Col>
            <Grid.Col span={1}>

                <div className='button' onClick={() => { alert('Add location coming soon.') }}><IconCirclePlus /></div>
            </Grid.Col>
        </Grid>
    )
}
