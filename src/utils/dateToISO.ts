interface IDate {
  calender: {
    identifier: string;
  };
  era: string;
  day: number;
  month: number;
  year: number;
}

const dateToIso = (date: IDate) => {
  if (!date) {
    return new Date().toISOString();
  }

  return new Date(`${date?.day}-${date?.month}-${date?.year}`).toISOString();
};
export default dateToIso;
