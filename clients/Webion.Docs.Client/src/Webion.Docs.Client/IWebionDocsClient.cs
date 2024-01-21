using Refit;

namespace Webion.Docs.Client;

public interface IWebionDocsClient
{
    /// <summary>
    /// Verifies that the template is valid.
    /// <remarks>
    /// Returns 200 if the template is valid, 400 otherwise.
    /// </remarks>
    /// </summary>
    [Post("/v1/templates/verify")]
    Task<IApiResponse> VerifyAsync([Body] VerifyTemplateRequest request);
    
    /// <summary>
    /// Renders the template.
    /// <remarks>
    /// Returns a stream with the rendered template, or 400 if
    /// the template is invalid or the request is malformed.
    /// </remarks>
    /// </summary>
    [Post("/v1/templates/render")]
    Task<Stream> RenderAsync([Body] RenderTemplateRequest request);
}