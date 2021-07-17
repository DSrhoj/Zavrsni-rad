import React from 'react';
import AttendanceCard from '../components/AttendanceCard';

module.exports = async function formatAttendance(attendanceData) {
    try {
        // Check if attendance are recieved
        if (attendanceData) {
            // Values recieved

            // Create cards array
            let attendanceCardsArray = await createAttendanceCardsArray(attendanceData);

            return attendanceCardsArray;
        }
        else {
            // Attendance not recieved
            console.log("Data does not exist!");

            return null;
        }

    } catch (error) {
        // Error geting events from server
        console.log("Error formatting events from server", error);
    }
}

const createAttendanceCardsArray = async (attendanceData) => {

    let cards = { winterSemester: [], summerSemester: [] };
    let keyId = 0;
    for (let i = 0; i < 2; i++) {

        let j = 0;

        while (j < attendanceData[i].classes.length) {

            for (let k = 0; k < 3; k++) {

                if (attendanceData[i].classes[j].attendance[k] != null) {

                    let type = await getType(k);

                    let cardData = {
                        title: attendanceData[i].classes[j].name,
                        dataText: attendanceData[i].classes[j].attendance[k].attendance,
                        data: await createDataForCard(attendanceData[i].classes[j].attendance[k].attendance),
                        type: type,
                        key: keyId,
                    }

                    keyId++;

                    let card = await createAttendanceCard(cardData);

                    if (i == 0) {
                        cards.winterSemester.push(card)
                    }
                    else {
                        cards.summerSemester.push(card);
                    }
                }
            }

            j++;
        }
    }

    return cards;
}

const createAttendanceCard = async (cardData) => {
    return (
        <AttendanceCard
            title={cardData.title}
            dataText={cardData.dataText}
            data={cardData.data}
            key={cardData.key}
            type={cardData.type}
        />
    )
}

const createDataForCard = async (dataText) => {

    let present = parseInt(dataText.split("/")[0].replace(" ", ""));
    let rest = parseInt(dataText.split("/")[1].replace(" ", "")) - present;
    let data = [
        { value: present, svg: { fill: "#3498db" }, key: 1 },
        { value: rest, svg: { fill: "gray" }, key: 2 }
    ]

    return data;
}

const getType = async (index) => {

    switch (index) {
        case 0:
            type = "Predavanja";
            break;
        case 1:
            type = "Auditorne vježbe";
            break;
        case 2:
            type = "Laboratorijske vježbe";
            break;
    }

    return type;
}

const Toolbar = (props) => {
    return (
        <Button theme={props.theme}/>
    )
}