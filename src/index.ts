import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import si from "systeminformation";


const server = new McpServer({
    name: "os-info-mcp-server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {}
    }
});



const getOsInfo = async () => {

    const cpu = await si.cpu();
    const mem = await si.mem();
    const osInfo = await si.osInfo();
    const disk = await si.diskLayout();
    const battery = await si.battery();
    const processes = await si.processes();
    const currentLoad = await si.currentLoad();

    return `
       CPU:
       Manufacturer: ${cpu.manufacturer}
       Brand: ${cpu.brand}
       Cores: ${cpu.cores}
       Speed: ${cpu.speed} GHz


       Memory:
       Total: ${(mem.total / 1024 / 1024 / 1024).toFixed(2)} GB
       Free: ${(mem.free / 1024 / 1024 / 1024).toFixed(2)} GB
       Used: ${(mem.used / 1024 / 1024 / 1024).toFixed(2)} GB


       OS:
       Platform: ${osInfo.platform}
       Distro: ${osInfo.distro}
       Release: ${osInfo.release}
       Hostname: ${osInfo.hostname}
       Architecture: ${osInfo.arch}


       Disk:
       ${disk.map(d => `
       Device: ${d.device}
       Type: ${d.type}
       Name: ${d.name}
       Size: ${(d.size / 1024 / 1024 / 1024).toFixed(2)} GB
       `).join('')}


       Battery:
       Has Battery: ${battery.hasBattery}
       Is Charging: ${battery.isCharging}
       Percent: ${battery.percent}%


       Processes:
       Running: ${processes.running}
       Blocked: ${processes.blocked}
       Sleeping: ${processes.sleeping}


       CPU Load:
       Average Load: ${currentLoad.avgLoad}
       Current Load: ${currentLoad.currentLoad.toFixed(2)}%
       `.trim();
}

server.tool(
    "os-info",
    "Fetches current operating system info",
    async () => {
        const osInfo = await getOsInfo();
        return {
            content: [
                {
                    type: "text",
                    text: osInfo
                }
            ]
        }
    }
)

const startServer = async () => {

    const transport = new StdioServerTransport();
    await server.connect(transport);
}

startServer().catch(console.error);