import { Accordion, Card, Divider, Grid, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import { WeekAccordion } from "./WeekAccordion";

interface YearTabsInterface {
    hours: formatHistoryType[] | undefined
}
export function YearTabs({ hours }: YearTabsInterface) {
    if (!hours) return
    const [activeTab, setActiveTab] = useState<string | null>(hours[0].year.toString())
    return (
        <Tabs variant="pills" value={activeTab} defaultValue={hours[0].year.toString()} onChange={setActiveTab}>
            <Tabs.List>
                {hours.map((y: formatHistoryType, yIdx: number) => (
                    <Tabs.Tab value={y.year.toString()} key={yIdx}>{y.year}</Tabs.Tab>
                ))}
            </Tabs.List>
            {hours.map((w: formatHistoryType, wIdx: number) => (
                <Tabs.Panel value={w.year.toString()} key={wIdx}>
                    <Card shadow='xs' radius='md' withBorder >
                        <Grid grow>
                            <Grid.Col span={4}>
                                <Text size='sm' fw={700}>Total for the year:</Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text size='sm' fw={700}>{w.hours}</Text>
                            </Grid.Col>
                        </Grid>
                        <Divider />
                        <Card.Section >
                            <Accordion multiple radius='sm'>
                                {w.weeks.map((d: formatHistoryWeeksType, dIdx: number) => (
                                    <WeekAccordion week={d} key={wIdx * 100 + dIdx} />
                                ))}
                            </Accordion>
                        </Card.Section>
                    </Card>
                </Tabs.Panel>
            ))}
        </Tabs>
    )
}
