import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('text')
  username: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text', { array: true })
  preferences: string[];

  @Column('text', { array: true })
  tecnologies: string[];

  @Column('text')
  description: string;

  // @Column('text')
  // password: string
}