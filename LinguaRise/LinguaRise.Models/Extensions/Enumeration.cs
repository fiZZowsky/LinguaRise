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

        public static TEnum FromValue(TValue value)
        {
            var matchingItem = GetAll().FirstOrDefault(item => EqualityComparer<TValue>.Default.Equals(item.Value, value));
            if (matchingItem == null)
            {
                throw new ArgumentException($"No matching enum found for value {value}");
            }
            return matchingItem;
        }

        public static TValue ToValue(TEnum enumItem)
        {
            if (enumItem == null)
            {
                throw new ArgumentNullException(nameof(enumItem), "Enum item cannot be null");
            }

            return enumItem.Value;
        }
    }
}
