import { Card, Divider, Text } from "@mantine/core";
interface DayCardInterface {
    day: hoursT
}
export function DayCard({day}:DayCardInterface) {
    return (
        <>
            <Divider />
            <Card  >
                <Card.Section >
                    <Text size='sm' fw={700}>{day.day}</Text>
                    <Text size='sm' fw={500}>{`${day.act} @ ${day.loc}`}</Text>
                    <Text size='xs'>{`Check In: ${day.in} Check Out: ${day.out} Hours ${Number(day.dur).toFixed(2)}`}</Text>
                </Card.Section>
            </Card>
        </>
    )
}
