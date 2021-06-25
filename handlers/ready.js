
module.exports = async (client) => {
 
 

    const s1 = { activity: { name: 'c?help', type: 'LISTENING' }, status: 'online' };
    const s2 = { activity: { name: `c?help | c?invite`, type: 'WATCHING' }, status: 'online' };
    const s3 = { activity: { name: 'c?invite', type: 'PLAYING' }, status: 'online' };
    const sstatus = [
        s1,
        s2,
        s3
    ]
    const rstatus = Math.floor(Math.random() * sstatus.length);
   setInterval(async () => {
        await client.user.setPresence(sstatus[rstatus])
    }, 12000)


    console.log(`Logged in as ${client.user.tag}!`);

}