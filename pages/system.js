const os = require('os');
export default (req, res) => {
	const totalMemory = os.totalmem();
	const freeMemory = os.freemem();
	const cpuInfo = os.cpus();
  
	const systemInfo = {
	  totalMemory,
	  freeMemory,
	  cpuInfo,
	};
  
	res.status(200).json(systemInfo);
  };
  