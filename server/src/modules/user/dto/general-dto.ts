export class CreateAwardDto {
  title: string;
  description: string;
  awardedDate: Date;
}


export class CreateCertificationDto {
  name: string;
  issuedDate: Date;
}

export class CreateProjectDto {
  title: string;          
  role: string;          
  year: string;          
  description: string;   
  link?: string;         
}



export class CreateWorkExperienceDto {
  companyName: string;
  position?: string;
  startDate: Date;
  endDate: Date;
}
