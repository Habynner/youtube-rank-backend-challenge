import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'users' })
export class UserEntity {
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
