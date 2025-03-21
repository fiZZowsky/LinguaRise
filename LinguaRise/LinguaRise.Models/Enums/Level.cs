using LinguaRise.Models.Extensions;

namespace LinguaRise.Models.Enums
{
    public class Level : Enumeration<Level, string>
    {
        public static readonly Level A1 = new Level("A1", "Beginner");
        public static readonly Level A2 = new Level("A2", "Elementary");
        public static readonly Level B1 = new Level("B1", "Intermediate");
        public static readonly Level B2 = new Level("B2", "Upper Intermediate");
        public static readonly Level C1 = new Level("C1", "Advanced");
        public static readonly Level C2 = new Level("C2", "Proficiency");

        public Level(string value, string name) : base(value, name)
        {
        }
    }
}
