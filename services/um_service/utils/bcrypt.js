import bcrypt from "bcrypt";

async function bcryptHash(str){
	return await bcrypt.hash(str , Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
}

async function bcryptCompare(str , hash){
	return await bcrypt.compare(str , hash);
}

export {bcryptHash , bcryptCompare};