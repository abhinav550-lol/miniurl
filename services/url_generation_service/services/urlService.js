import {appError} from "../error/appError.js";
import logger from "../utils/logger.js";
import prisma from "../config/prisma.js";
import {SnowflakeIDGenerator} from "../services/snowflakeIdService.js";
class urlService {
	async checkIfAliasAvailablity({customAlias}) {
		const existingAlias = await prisma.short_urls.findUnique({
			where: {
				customAlias
			}
		});

		return !existingAlias;
	}

	async checkIfLongURLExistsForSameUser({longURL , userId}) {
		const existingURL = await prisma.short_urls.findFirst({
			where: {
				longURL,
				userId
			}
		});

		return existingURL ? true : false;
	}

	async createShortURL({longURL , isCustomAlias=false , customAlias , userId}) {
		try{
			const longURLExists = await this.checkIfLongURLExistsForSameUser({longURL , userId});
			
			if(longURLExists) {
				throw new appError(400 , "This long URL already exists for you.");
			}

			const shortCode = SnowflakeIDGenerator.generateSnowflakeId();

			if(isCustomAlias && !customAlias) {
				throw new appError(400 , "Please provide custom alias");
			}

			if(isCustomAlias){
				const isAliasAvailable = await this.checkIfAliasAvailablity({customAlias});
	
				if(!isAliasAvailable) {
					throw new appError(400 , "Custom alias is already taken");
				}
			}

			const newURL = await prisma.short_urls.create({
				data: {
				shortCode,
				longURL,
				isCustomAlias,
				customAlias : isCustomAlias ? customAlias : null,
				userId
			}
			});

			return {
				success : true,
				message : "Short URL created successfully",
				data : newURL
			}

		} catch(err){
			logger.error(`Error in createShortURL: ${err.message}`);
			throw err;
		}
	}

	async getUserShortURLs({userId}) {
		try{
			const userURLs = await prisma.short_urls.findMany({
				where: {
					userId
				}
			});

			return {	
				success : true,
				message : "User's short URLs fetched successfully",
				data : userURLs
			}
		} catch(err){
			logger.error(`Error in getUserShortURLs: ${err.message}`);
			throw err;
		}
	}

	async upsertCustomAlias({shortCode , customAlias , userId}) {
		try{
			const existingURL = await prisma.short_urls.findFirst({
				where: {
					shortCode,
					userId
				}
			});

			if(!existingURL) {
				throw new appError(404 , "Short URL not found for this user");
			}

			if(existingURL.isCustomAlias && existingURL.customAlias === customAlias) {
				throw new appError(400 , "This custom alias is already set for this short URL");
			}
			
			const isAliasAvailable = await this.checkIfAliasAvailablity({customAlias});

			if(!isAliasAvailable) {
				throw new appError(400 , "Custom alias is already taken");
			}

			const updatedURL = await prisma.short_urls.update({
				where: {
					shortCode,
					userId
				},
				data: {
					isCustomAlias: true,
					customAlias
				}
			});

			return {
				success : true,
				message : "Custom alias updated successfully",
				data : updatedURL
			}
		}catch(err){
			logger.error(`Error in upsertCustomAlias: ${err.message}`);
			throw err;
		}
	}

	async getShortURLDetails({shortCode , userId}) {
		try{
			const urlDetails = await prisma.short_urls.findFirst({
				where: {
					shortCode,
					userId
				}
			});

			if(!urlDetails) {
				throw new appError(404 , "Short URL not found");
			}

			return {
				success : true,
				message : "Short URL details fetched successfully",
				data : urlDetails
			}
		} catch(err){
			logger.error(`Error in getShortURLDetails: ${err.message}`);
			throw err;
		}
	}

	async updateLongURL({shortCode , newLongURL , userId}) {
		try{
			const checkIfLongURLExistsForSameUser = await prisma.short_urls.findFirst({
				where: {
					longURL: newLongURL,
					userId
				}
			});

			if(checkIfLongURLExistsForSameUser) {
				throw new appError(400 , "This long URL already exists for you.");
			}

			const existingURL = await prisma.short_urls.findFirst({
				where: {
					shortCode,
					userId
				}
			});

			if(!existingURL) {
				throw new appError(404 , "Short URL not found for this user");
			}

			const updatedURL = await prisma.short_urls.update({
				where: {
					shortCode,
					userId
				},
				data: {
					longURL: newLongURL
				}
			});

			return {
				success : true,
				message : "Long URL updated successfully",
				data : updatedURL
			}
		} catch(err){
			logger.error(`Error in updateLongURL: ${err.message}`);
			throw err;
		}
	}

	async deleteShortURL({shortCode , userId}){
		try{
			const existingURL = await prisma.short_urls.findFirst({
				where: {
					shortCode,
					userId
				}
			});

			if(!existingURL) {
				throw new appError(404 , "Short URL not found for this user");
			}

			const unactiveURL = await prisma.short_urls.update({
				where: {
					shortCode,
					userId
				},
				data: {
					isActive: false
				}
			});

			return {
				success : true,
				message : "Short URL deleted successfully",
				data : unactiveURL
			}
		} catch(err){
			logger.error(`Error in deleteShortURL: ${err.message}`);
			throw err;
		}
	}
}


const urlServiceInstance = new urlService();
export { urlServiceInstance as urlService };