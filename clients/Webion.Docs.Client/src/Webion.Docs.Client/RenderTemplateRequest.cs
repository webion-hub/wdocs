namespace Webion.Docs.Client;

public sealed class RenderTemplateRequest
{
    /// <summary>
    /// Base64 encoded template.
    /// </summary>
    public required string Template { get; init; }
    
    /// <summary>
    /// Data to be used to render the template.
    /// </summary>
    public required object Data { get; init; }
}