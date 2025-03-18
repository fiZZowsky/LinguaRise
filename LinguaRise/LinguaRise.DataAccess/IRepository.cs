namespace LinguaRise.DataAccess;

public interface IRepository<T, TKey> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> GetAsync(TKey id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(TKey id);
}