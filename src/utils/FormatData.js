import dayjs from "dayjs"

export function joinedDate(ISO){
    const date = dayjs(ISO);
    const formateDate = `Joined ${date.format("DD/MM/YYYY")}`

    return formateDate;
}