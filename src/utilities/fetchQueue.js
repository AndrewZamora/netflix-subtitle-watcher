export class FetchQueue {
    constructor(concurrency = 1) {
        this.queue = [];
        this.activeCount = 0;
        this.concurrency = concurrency;
    }

    add(url, options) {
        return new Promise((resolve, reject) => {
            const task = () => {
                this.activeCount++;
                fetch(url, options)
                    .then(response => response.json())
                    .then(response => resolve(response))
                    .catch(error => reject(error))
                    .finally(() => {
                        this.activeCount--;
                        this.next();
                    });
            };
            this.queue.push(task);
            this.next();
        });
    };

    next() {
        if (this.activeCount >= this.concurrency || this.queue.length === 0) return;
        const task = this.queue.shift();
        task();
    }
}