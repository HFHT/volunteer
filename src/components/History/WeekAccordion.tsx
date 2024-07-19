import { Accordion, Grid, Text } from "@mantine/core";
import { DayCard } from "..";

interface WeekAccordionInterface {
    week: formatHistoryWeeksType
}
export function WeekAccordion({ week }: WeekAccordionInterface) {
    return (
        <>
            <Accordion.Item key={week.weekNo} value={week.weekNo.toString()}>
                <Accordion.Control>
                    <Grid grow>
                        <Grid.Col span={1}>
                            <Text size='sm' fw={700}>{`Week: ${week.weekNo.toString()}`}</Text>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Text size='sm' fw={700}>{`Hours: ${week.hours.toFixed(2)}`}</Text>
                        </Grid.Col>
                    </Grid>
                </Accordion.Control>
                <Accordion.Panel>
                    {week.rcds.map((r: hoursT, rIdx: number) => (
                        <DayCard day={r} key={rIdx} />
                    ))}
                </Accordion.Panel>
            </Accordion.Item>
        </>
    )
}
