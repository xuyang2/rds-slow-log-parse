const numerify = require('./lib/numerify');
const {pattern} = require('./lib/pattern');

const NUMERIC_FIELDS = [
    'duration',
    'lock_wait',
    'rows_sent',
    'rows_examined',
    'timestamp',
];

module.exports = (string) => {
    const match = pattern.exec(string);

    if (!match) {
        return {};
    }

    const [, user, host, ip, id, duration, lock_wait, rows_sent, rows_examined, timestamp, query] = match;

    return process({
        user,
        host,
        ip,
        id,
        duration,
        lock_wait,
        rows_sent,
        rows_examined,
        timestamp,
        query,
    });
};

function process(entry) {
    numerify(entry, NUMERIC_FIELDS);

    // convert seconds to unix timestamp
    entry.timestamp = entry.timestamp * 1000;

    return entry;
}