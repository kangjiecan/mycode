import { Prisma } from "@prisma/client";
const prisma = new Prisma();
const Photo = require('../models/Photo');

class prismaRepo{
    constructor(){
        this.prisma = new Prisma();
        this.photo = new Photo();
    }
    
    async getAll(){
        try {
            return photo.createphoto(await prisma.image.findMany());
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(`${error.code}, ${error.meta}`);
                return '${error.code}, ${error.meta}';
            } else {jjs 
                console.log(error);
                return 'error';
            }

            
        }   
    
