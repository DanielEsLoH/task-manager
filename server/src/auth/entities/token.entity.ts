import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({
    description: 'The access token for the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2MjYwNjQwMDAsImV4cCI6MTYyNjE1MDQwMH0.verylongaccesstokenstring',
  })
  accessToken: string;
}
