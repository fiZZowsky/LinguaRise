using System.Diagnostics;

namespace LinguaRise.Common;

public static class SoundConverter
{
    public static async Task<Stream> ConvertWebmToWavAsync(Stream webmStream)
    {
        var inputPath = Path.GetTempFileName() + ".webm";
        var outputPath = Path.GetTempFileName() + ".wav";

        await using (var file = File.Create(inputPath))
        {
            await webmStream.CopyToAsync(file);
        }

        var psi = new ProcessStartInfo
        {
            FileName = "ffmpeg",
            Arguments = $"-y -i \"{inputPath}\" -ac 1 -ar 16000 -f wav \"{outputPath}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false
        };

        using (var proc = Process.Start(psi)!)
        {
            await proc.WaitForExitAsync();
        }

        var ms = new MemoryStream(await File.ReadAllBytesAsync(outputPath));
        File.Delete(inputPath);
        File.Delete(outputPath);
        ms.Position = 0;
        return ms;
    }

}
