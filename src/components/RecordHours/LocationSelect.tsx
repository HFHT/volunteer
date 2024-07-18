import { Grid, NativeSelect } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"

interface LocationSelectInterface {
    locations: locT[]
    selected: [string, Function]
    disabled: boolean
}
export function LocationSelect({ locations, selected, disabled }: LocationSelectInterface) {
    return (
        <Grid >
            <Grid.Col span={11} >
                <NativeSelect value={selected[0]}
                    disabled={disabled}
                    aria-label='Select Location'
                    onChange={(e: any) => selected[1](e.target.value)}>
                    {locations && locations.map((l: locT, idx: number) => (
                        <option key={idx} value={l.title}>{`${l.title} (${(l.distance && l.distance > 99) ? '--' : `${l.distance} miles`})`}</option>
                    ))}
                </NativeSelect>
            </Grid.Col>
            <Grid.Col span={1}>
                <div className='button' onClick={() => { alert('Add location coming soon.') }}><IconCirclePlus /></div>
            </Grid.Col>
        </Grid>
    )
}
