import { Accordion, Card, Group, Text } from "@mantine/core";
interface ActivityLogI {
  activity: any
  idx: number
}
export function ActivityLog({activity, idx}:ActivityLogI) {
  console.log('ActivityLog', activity, idx)
  if (!activity) return 
  return (
    <Card shadow='xs' radius='md' withBorder >
      <Card.Section >
        <Accordion>
          <Accordion.Item key={idx.toString()} value={idx.toString()} >
            <Accordion.Control>
              <Group justify='space-between' mt="xs" mb="xs" className="card-margin">
                <Text size='sm' fw={700} >{`${activity.act} @ ${activity.loc}`}</Text>
                <Text size='sm' fw={700} >{`${activity.dur} hours`}</Text>
              </Group>                        </Accordion.Control>
            <Accordion.Panel>
              <Group justify='space-between' mt="xs" mb="xs" className="card-margin">
                <Text size='sm' >{activity.day}</Text>
                <Text size='sm' >{`In: ${activity.in}`}</Text>
                <Text size='sm' >{`Out: ${activity.out}`}</Text>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  )
}
