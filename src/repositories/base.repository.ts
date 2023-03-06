export default interface BaseRepository<T> {
  create(dto: Partial<T>): Promise<T>;

  findByPk(pk: string | number): Promise<T | undefined>;

  findByPkOrThrow(pk: string | number): Promise<T>;

  update(pk: string | number, dto: Partial<T>): Promise<void>;

  delete(pk: string | number): Promise<void>;
}
