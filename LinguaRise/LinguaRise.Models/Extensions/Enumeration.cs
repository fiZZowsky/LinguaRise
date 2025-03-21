using System.Reflection;

namespace LinguaRise.Models.Extensions
{
    public abstract class Enumeration<TEnum, TValue> where TEnum : Enumeration<TEnum, TValue>
    {
        public string Name { get; private set; }
        public TValue Value { get; private set; }

        protected Enumeration(TValue value, string name)
        {
            Value = value;
            Name = name;
        }

        public static IEnumerable<TEnum> GetAll()
        {
            return typeof(TEnum)
                .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly)
                .Where(f => f.FieldType == typeof(TEnum))
                .Select(f => (TEnum)f.GetValue(null));
        }
    }
}
