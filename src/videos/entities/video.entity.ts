import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'videos' })
export class VideoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  userId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  name: string;

  @Column({ name: 'alias', length: 100, nullable: false })
  alias: string;

  @Column({ name: 'url', length: 150, nullable: false })
  url: string;

  @Column({ name: 'valor', nullable: false })
  votes: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  description: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
