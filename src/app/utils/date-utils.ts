export class DateUtils {

    getDaysDiff(higherDate: Date, lowerDate: Date): number {
        const diff = higherDate.getTime() - lowerDate.getTime();
        return Math.ceil(diff / (1000 * 3600 * 24));
    }

    addDays(currentDate, days): Date {
        const date = new Date(currentDate.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    getDates(startDate, stopDate): Date[] {
        const dateArray = [];
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = this.addDays(currentDate, 1);
        }

        return dateArray;
    }

}
