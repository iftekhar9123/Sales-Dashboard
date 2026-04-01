import React, { useState, useEffect } from 'react'
import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { getAllStates, getMinMaxDates } from '../services/api';

const Filters = ({ onFilterChange, compact }: any) => {
    const [states, setStates] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState("");
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        getAllStates().then((response) => {
            const states = response.data.data.states;
            setStates(states);
            if (states.length > 0) {
                setSelectedState(states[0]);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedState) {
            getMinMaxDates(selectedState).then((response) => {
                setFromDate(dayjs(response.data.data.minDate.split("T")[0]));
                setToDate(dayjs(response.data.data.maxDate.split("T")[0]));
            });
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedState && fromDate && toDate) {
            onFilterChange({
                state: selectedState,
                fromDate: fromDate.format("YYYY-MM-DD"),
                toDate: toDate.format("YYYY-MM-DD"),
            });
        }
    }, [selectedState, fromDate, toDate, onFilterChange]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mb={compact ? 0 : 3}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <FormControl size={compact ? "small" : "medium"} sx={{ minWidth: compact ? 140 : undefined, ...(compact ? {} : { fullWidth: true }) }}>
                        <InputLabel>State</InputLabel>
                        <Select
                            value={selectedState}
                            label="State"
                            onChange={(e) => setSelectedState(e.target.value)}
                        >
                            {states.map((state) => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Date Pickers */}
                    <DatePicker
                        label="From Date"
                        value={fromDate}
                        onChange={(val) => setFromDate(val)}
                        slotProps={{ textField: { size: compact ? "small" : "medium" } }}
                    />
                    <DatePicker
                        label="To Date"
                        value={toDate}
                        onChange={(val) => setToDate(val)}
                        slotProps={{ textField: { size: compact ? "small" : "medium" } }}
                    />
                </Stack>
            </Box>
        </LocalizationProvider>
    );

}

export default Filters  