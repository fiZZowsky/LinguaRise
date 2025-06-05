namespace LinguaRise.Common;

public static class StringSimilarity
{
    public static int CalculateSimilarity(string userInput, string original)
    {
        if (userInput == null) throw new ArgumentNullException(nameof(userInput));
        if (original == null) throw new ArgumentNullException(nameof(original));

        if (userInput.Length > 0 && userInput[userInput.Length - 1] == '.')
        {
            userInput = userInput.Substring(0, userInput.Length - 1);
        }

        if (userInput.Length == 0 && original.Length == 0)
            return 100;

        int distance = ComputeLevenshteinDistance(userInput, original);

        int maxLen = Math.Max(userInput.Length, original.Length);
        if (maxLen == 0)
            return 100;

        double similarity = (1.0 - (double)distance / maxLen) * 100.0;

        int result = (int)Math.Round(similarity);
        if (result < 0) result = 0;
        if (result > 100) result = 100;
        return result;
    }

    private static int ComputeLevenshteinDistance(string a, string b)
    {
        int lenA = a.Length;
        int lenB = b.Length;

        var dp = new int[lenA + 1, lenB + 1];

        for (int i = 0; i <= lenA; i++)
            dp[i, 0] = i;
        for (int j = 0; j <= lenB; j++)
            dp[0, j] = j;

        for (int i = 1; i <= lenA; i++)
        {
            for (int j = 1; j <= lenB; j++)
            {
                int cost = (a[i - 1] == b[j - 1]) ? 0 : 1;

                dp[i, j] = Math.Min(
                    Math.Min(
                        dp[i - 1, j] + 1,
                        dp[i, j - 1] + 1
                    ),
                    dp[i - 1, j - 1] + cost
                );
            }
        }

        return dp[lenA, lenB];
    }
}
