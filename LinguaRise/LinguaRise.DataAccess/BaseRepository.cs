﻿using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace LinguaRise.DataAccess;

public abstract class BaseRepository<T, TKey> : IRepository<T, TKey> where T : class
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<T> _dbSet;

    protected BaseRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();

    public async Task<IEnumerable<T>> QueryByObjectAsync<TQuery>(TQuery queryObj) where TQuery : class
    {
        var parameter = Expression.Parameter(typeof(T), "x");
        Expression? predicate = null;

        var entityProps = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
        var queryProps = typeof(TQuery).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        foreach (var qProp in queryProps)
        {
            var value = qProp.GetValue(queryObj);
            if (value == null || (value is string str && string.IsNullOrWhiteSpace(str)))
                continue;

            var matchingEntityProp = entityProps.FirstOrDefault(p => p.Name == qProp.Name && p.PropertyType == qProp.PropertyType);
            if (matchingEntityProp == null)
                continue;

            var property = Expression.Property(parameter, matchingEntityProp);
            var constant = Expression.Constant(value);
            Expression comparison;

            if (qProp.PropertyType == typeof(string))
            {
                comparison = Expression.Call(
                    property,
                    nameof(string.Contains),
                    Type.EmptyTypes,
                    constant
                );
            }
            else
            {
                comparison = Expression.Equal(property, constant);
            }

            predicate = predicate == null ? comparison : Expression.AndAlso(predicate, comparison);
        }

        IQueryable<T> query = _dbSet.AsQueryable();
        query = IncludeNavigationProperties(query);

        if (predicate != null)
        {
            var lambda = Expression.Lambda<Func<T, bool>>(predicate, parameter);
            query = query.Where(lambda);
        }

        return await query.ToListAsync();
    }
    protected virtual IQueryable<T> IncludeNavigationProperties(IQueryable<T> query)
    {
        return query;
    }
    public async Task<T> GetAsync(TKey id) => await _dbSet.FindAsync(id);
    public async Task<TKey> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();

        var keyName = _context.Model
            .FindEntityType(typeof(T))!
            .FindPrimaryKey()!
            .Properties
            .Select(p => p.Name)
            .Single();

        var keyValue = (TKey)entity
            .GetType()
            .GetProperty(keyName)!
            .GetValue(entity)!;

        return keyValue;
    }
    public async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(TKey id)
    {
        var entity = await GetAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}