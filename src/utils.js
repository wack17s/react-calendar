export const dayNames = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

export function divide(req) {
  const res = {};

  for (let day = 0; day < 7; day++) {
    res[dayNames[day]] = [];

    req[dayNames[day]].forEach(item => {
      for (let t = item.bt; t < item.et; t += 60) {
        res[dayNames[day]].push({
          bt: t,
          et: t + 59
        });
      }
    });

  }

  return res;
}

export function fillDay() {
  const res = [];
  for (let n = 0; n < 24; n++) {
    res.push({bt: n*60, et: n*60+59})
  }

  return res;
}

export function clearAll() {
  const res = {};
  for (let n = 0; n < 7; n++) {
    res[dayNames[n]] = [];
  }

  return res;
}

export function fillAll() {
  const res = {};
  for (let n = 0; n < 7; n++) {
    res[dayNames[n]] = fillDay();
  }

  return res;
}
