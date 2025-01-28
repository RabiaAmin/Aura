import {Account,Client,ID,Databases, Query, Storage} from 'react-native-appwrite'

import * as DocumentPicker from "expo-document-picker";

export const config={
    platform: 'com.company.Luna',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    databaseUserId:process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
    databaseVideoId:process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
    storageId:process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
    
  }
  
export const client = new Client();



type CreateUserAccount ={
    email:string
    password:string
    username:string
}

type LoginUserAccount = {
    email:string
    password:string
}

type FormType = {
  title: string;
  video:  DocumentPicker.DocumentPickerAsset | null;
  thumnail:  DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
  userId:string;

}

type FileType= {
    name: string
    size: number
    uri: string
    mimeType: string
    lastModified: number
    file: File
} ;


class AppwriteService{
    account;
    database;
    storage;

    constructor(){
        client
        .setEndpoint(config.endpoint!)
        .setProject(config.projectId!)
        .setPlatform(config.platform)

        this.account = new Account(client);
        
        this.database = new Databases(client);

        this.storage = new Storage(client);
    }
    
    async createUserAccount({email,password,username}:  CreateUserAccount){
        try{
            const user = await this.account.create(
                ID.unique(), 
                email,
                password,
                username,
              
            );
            
           
             await  this.logInAccount({email,password});

            const userDb =   this.database.createDocument(
                config.databaseId!,
                config.databaseUserId!,
                ID.unique(),
                {accountId:user.$id,email,username}
            );
             
               
          return userDb;
             
            
        }
        catch(error:unknown){
            
          let errorMessage: string;

          if (error instanceof Error) {
            errorMessage = error.message; // Extract the message if it's an Error object
            console.log("appwrite service::createUserAccount() error message"+ errorMessage)
          } else {
            errorMessage = 'An unknown error occurred.'; // Fallback for other error types
            console.log("appwrite service::createUserAccount() error message"+ errorMessage)
          }
        }
    }


    async logInAccount({email,password}:LoginUserAccount){
        try{
         return  await this.account.createEmailPasswordSession(
            email, 
            password
        );

        } catch(error:unknown){
            // Extract the error message
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message; // Extract the message if it's an Error object
      console.log("appwrite service::logInAccount() error message"+ errorMessage)
    } else {
      errorMessage = 'An unknown error occurred.'; // Fallback for other error types
      console.log("appwrite service::logInAccount() error message"+ errorMessage)
    }

        }
    }

    async getCurrentSession(){
      try {
         const currentAccount = await this.account.get();
         const currentUserDb = await this.database.listDocuments(config.databaseId!,config.databaseUserId!,[Query.equal('accountId',currentAccount.$id)]);
         return {
          email: currentUserDb.documents[0].email,
          username: currentUserDb.documents[0].username,
          id:currentUserDb.documents[0].$id
        };
      } catch (error:unknown) {
        let errorMessage: string;

        if (error instanceof Error) {
          errorMessage = error.message; // Extract the message if it's an Error object
          console.log("appwrite service:: getCurrentSession() error message"+ errorMessage)
        } else {
          errorMessage = 'An unknown error occurred.'; // Fallback for other error types
          console.log("appwrite service:: getCurrentSession() error message"+ errorMessage)
        }
      }
    }

    async logOut(){
      try {
        
          return     await this.account.deleteSession("current");
      } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
          errorMessage = error.message; // Extract the message if it's an Error object
          console.log("appwrite service:: logOut() error message"+ errorMessage)
        } else {
          errorMessage = 'An unknown error occurred.'; // Fallback for other error types
          console.log("appwrite service:: logOut() error message"+ errorMessage)
        } 
      }
    }

    async getAllVideo(){
      try {
        const post =  await this.database.listDocuments(
          config.databaseId!,config.databaseVideoId!
        );
     
        

        return post.documents
      } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
          errorMessage = error.message; // Extract the message if it's an Error object
          console.log("appwrite service:: getAllVideo() error message"+ errorMessage)
        } else {
          errorMessage = 'An unknown error occurred.'; // Fallback for other error types
          console.log("appwrite service:: getAllVideo() error message"+ errorMessage)
        }
      }

      return [];
    }

    
    async getLatestVideo(){
      try {
        const post =  await this.database.listDocuments(
          config.databaseId!,config.databaseVideoId!,[Query.orderDesc('$createdAt')]
        );
        
        
       
        return post.documents
      } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
          errorMessage = error.message; // Extract the message if it's an Error object
          console.log("appwrite service:: getAllVideo() error message"+ errorMessage)
        } else {
          errorMessage = 'An unknown error occurred.'; // Fallback for other error types
          console.log("appwrite service:: getAllVideo() error message"+ errorMessage)
        }
      }

      return [];
    }

    async getSearchVideo(query:string){

      try {
        const post =  await this.database.listDocuments(
          config.databaseId!,config.databaseVideoId!,   [Query.search('title', query)]
        );
        
      
        return post.documents
      } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
          errorMessage = error.message; // Extract the message if it's an Error object
          console.log("appwrite service:: getSearchVideo() error message"+ errorMessage)
        } else {
          errorMessage = 'An unknown error occurred.'; // Fallback for other error types
          console.log("appwrite service:: getSearchVideo() error message"+ errorMessage)
        }
      }

      return [];
    }

    async getUserVideo(userId:string){
    
      try {
        const post =  await this.database.listDocuments(
          config.databaseId!,config.databaseVideoId!,   [Query.equal('user', userId )]
        );
        
     
        return post.documents
      } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
          errorMessage = error.message; // Extract the message if it's an Error object
          console.log("appwrite service:: getSearchVideo() error message"+ errorMessage)
        } else {
          errorMessage = 'An unknown error occurred.'; // Fallback for other error types
          console.log("appwrite service:: getSearchVideo() error message"+ errorMessage)
        }
      }

      return [];
    }

    async getFilePrefview(fileId:string,type:string){
      let fileUrl;

      try{
        if(type ==='video'){
          fileUrl = this.storage.getFileView(config.storageId!,fileId)
        }else if(type === 'image'){
          fileUrl = this.storage.getFilePreview(config.storageId!,fileId,2000,2000)

        }else{
          throw Error('Invalid file type');
        }

        if(!fileUrl) throw Error;
      }catch(error){
        throw error;
      }

      return fileUrl
    }

    async uploadFile(file:DocumentPicker.DocumentPickerAsset | null,type:string){
      if(!file) return;
      const {mimeType,...rest} = file;
      const asset = {type:mimeType,...rest}

      const formatedFile = {
        name: file.name,
        size: file.size ?? 0,
        uri: file.uri,
        type: file.mimeType ?? ' ',
      }
       
    

      try {
        const uploadedFile = await this.storage.createFile(
          config.storageId!,
          ID.unique(),
           formatedFile
         )

        const fileUrl = await this.getFilePrefview(
          uploadedFile.$id,type
        );

        return fileUrl
      } catch (error) {
        throw error;
      }

    }

    async createPost(form:FormType){
      try {
        const [thumbnailUrl,videoUrl]= await Promise.all([
          this.uploadFile(form.thumnail,'image'),
          this.uploadFile(form.video,'video')
        ])

        const newPost = await this.database.createDocument(
          config.databaseId!,config.databaseVideoId!,ID.unique(),{
            title:form.title,
            thumbnail:thumbnailUrl,
            video:videoUrl,
            prompt:form.prompt,
            user:form.userId
          }
        )

        return newPost;
      } catch (error) {
        if(error instanceof Error){

          console.log("error message form createVideo::",error.message);
        }
      }
    }


    
}

export default AppwriteService





