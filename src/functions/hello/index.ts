import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
  deploymentSettings: {
    type: 'Linear10PercentEvery1Minute',
    alias: 'Live',
    alarms: ['Hello5XXErrorsAlarm', 'HelloFunctionErrorsAlarm'],
  },
};
