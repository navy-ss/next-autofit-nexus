import { CSVLink } from "react-csv";
import { FileExcelTwoTone } from "@ant-design/icons";
import PropTypes from 'prop-types';

export default function Csv({ data, year }) {
    const csvIconStyle = {
        fontSize: "30px",
        cursor: "pointer",
        color: "blue",
    };

    const filename = "Savings_Report";

    // Add header row
    const csvData = [
        ["Automation Implementation: Cost and Savings Calculator"], // Header row
        [], // Empty row for spacing
        ["Year", year], // Year row
        [], // Another empty row
        // Add table headers
        [
            "", "Development Phase", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6",
            "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12", "Month 13", "Month 14",
            "Month 15", "Month 16", "Month 17", "Month 18", "Month 19", "Month 20", "Month 21",
            "Month 22", "Month 23", "Month 24", "Month 25", "Month 26", "Month 27", "Month 28",
            "Month 29", "Month 30", "Month 31", "Month 32", "Month 33", "Month 34", "Month 35", "Month 36"
        ],
        // Map through data and push to csvData
        ...data.map(item => [
            item.type,
            item.development_phase,
            item.month_1, item.month_2, item.month_3, item.month_4, item.month_5, item.month_6,
            item.month_7, item.month_8, item.month_9, item.month_10, item.month_11, item.month_12,
            item.month_13, item.month_14, item.month_15, item.month_16, item.month_17, item.month_18,
            item.month_19, item.month_20, item.month_21, item.month_22, item.month_23, item.month_24,
            item.month_25, item.month_26, item.month_27, item.month_28, item.month_29, item.month_30,
            item.month_31, item.month_32, item.month_33, item.month_34, item.month_35, item.month_36
        ])
    ];

    return (
        <>
            <CSVLink data={csvData} filename={`${filename}.csv`}>
                <FileExcelTwoTone style={csvIconStyle} />
            </CSVLink>
        </>
    );
}

Csv.propTypes = {
    data: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
};
