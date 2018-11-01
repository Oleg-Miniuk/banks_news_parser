const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.hour = [new schedule.Range(9 - 19)];
rule.minute = [new schedule.Range(0, 59)];
rule.second = [new schedule.Range(0, 59, 3)];

const j = schedule.scheduleJob(rule, async () => {
  console.log('The answer to life, the universe, and everything!');
});
