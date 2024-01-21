namespace Webion.Docs.Client;

public sealed class VerifyTemplateRequest
{
    /// <summary>
    /// Base64 encoded template.
    /// </summary>
    public required string Template { get; init; }
}