import { useRef } from 'react';
import { ActionIcon, rem } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
interface TimePickerInterface {
    value: string
    onChange: Function
}
export function TimePicker({ value, onChange }: TimePickerInterface) {
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );

    return (
        <TimeInput value={value} onChange={(e: any) => onChange(e.target.value)} ref={ref} rightSection={pickerControl} />
    );
}