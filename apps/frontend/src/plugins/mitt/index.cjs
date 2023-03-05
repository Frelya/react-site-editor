export default function (all = new Map()) {
    return {
        all,
        on: function (evt, handler) {
            let i = all.get(evt);
            if (i) {
                i.push(handler);
            } else {
                all.set(evt, [handler]);
            }
        },
        off: function (evt, handler) {
            let i = all.get(evt);
            if (i) {
                if (handler) {
                    i.splice(i.indexOf(handler) >>> 0, 1);
                } else {
                    all.set(evt, []);
                }
            }
        },
        emit: function (evt, handler) {
            let i = all.get(evt);
            if (i) {
                i.slice().map(function (n) {
                    n(handler);
                });
            }
            i = all.get('*');
            if (i) {
                i.slice().map(function (n) {
                    n(evt, handler);
                });
            }
        }
    };
}
