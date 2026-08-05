import dotenv from 'dotenv';
dotenv.config();

const CUSTOM_EPOCH = BigInt(1672531200000); // 2023-01-01 00:00:00 UTC

class SnowFlakeIdService {
	//utils
	encodeBase62 = (num) => {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';
		while (num > 0) {
			result = chars[Number(num % 62n)] + result;
			num /= 62n;
		}
		return result || '0';
	}


	getMachineId = () => {
		const machineId = process.env.SERVER_INSTANCE_ID;
		if (!machineId) {
			throw new Error('SERVER_INSTANCE_ID is not set in the environment variables.');
		}

		const machineIdNum = Number(machineId);
		if(machineIdNum < 0 || machineIdNum > 1023){
			throw new Error('SERVER_INSTANCE_ID must be between 0 and 1023.');
		}

		return BigInt(machineIdNum);
	}

	getTimestamp = () => {
		return BigInt(Date.now()) - CUSTOM_EPOCH;
	}

	lastTimestamp = BigInt(0);
	sequenceId = BigInt(0);
	MAX_SEQUENCE = BigInt(4095);
	machineId = this.getMachineId();


	//id generator
	generateSnowflakeId = () => {
		let timestamp = this.getTimestamp();

		if(timestamp < this.lastTimestamp){
			do{timestamp = this.getTimestamp();}while(timestamp <= this.lastTimestamp);
		}

		if(timestamp === this.lastTimestamp){
			this.sequenceId = (this.sequenceId + BigInt(1)) & this.MAX_SEQUENCE;
			if(this.sequenceId === BigInt(0)){
				do{timestamp = this.getTimestamp();}while(this.getTimestamp() <= this.lastTimestamp);
			}
		}else{
			this.sequenceId = BigInt(0);
		}

		this.lastTimestamp = timestamp;
		return this.encodeBase62((timestamp << BigInt(22)) | (this.machineId << BigInt(12)) | this.sequenceId);
	}

};

const SnowflakeIDGenerator = new SnowFlakeIdService();

export { SnowflakeIDGenerator };