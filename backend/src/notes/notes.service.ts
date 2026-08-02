import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
  ) {}

  async findByLesson(userId: string, lessonId: string): Promise<NoteDocument[]> {
    return this.noteModel.find({ userId, lessonId }).sort({ createdAt: -1 }).exec();
  }

  async create(userId: string, lessonId: string, content: string): Promise<NoteDocument> {
    return this.noteModel.create({ userId, lessonId, content });
  }

  async update(userId: string, noteId: string, content: string): Promise<NoteDocument> {
    const note = await this.noteModel.findOneAndUpdate(
      { _id: noteId, userId },
      { content },
      { new: true },
    ).exec();
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async delete(userId: string, noteId: string): Promise<void> {
    const result = await this.noteModel.findOneAndDelete({ _id: noteId, userId }).exec();
    if (!result) throw new NotFoundException('Note not found');
  }
}
