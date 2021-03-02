

const amqp = require("amqplib");
const got = require("got");

async function producer() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        channel.assertQueue("some");
        let sites = ["abc", "def", "ghi", "lmn"];
        setTimeout(() => {
            for(let i=0; i<sites.length; i+=1)
                channel.sendToQueue("some", Buffer.from(sites[i].toString()));
        }, 1000);
    }
    catch(e) {
        console.error(e);
    }
}

let channel =  null;
let name = process.argv[3];

async function consumer() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel();
        channel.assertQueue("some");
        channel.consume("some", async(msg) => {
            console.log(msg.content.toString());
            setTimeout(() => {
                channel.ack(msg);
            }, 20000)
        }, {consumerTag: name});

    } catch (e) {
        console.error(e);
    }
}

process.on("SIGINT", async(si) => {
    if(!name)
        process.exit(0);
    else {
        channel.cancel(name);

        setTimeout(() => process.exit(0), 1000); /// 50s
    }
})

if(process.argv[2] == "c")
    consumer();
else 
    producer();



