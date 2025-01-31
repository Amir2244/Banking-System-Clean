using System.Net;
using System.Text.Json;
using BankingSystem.Application.Exceptions;

namespace BankingSystem.Middleware;

public class ExceptionHandlingMiddleware
{
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true,
    };

    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger
    )
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = new ErrorResponse();

        switch (exception)
        {
            case ValidationException validationEx:
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Message = "Validation failed";
                response.Details = string.Join(
                    ", ",
                    validationEx.Errors.Select(e => $"{e.PropertyName}: {e.Message}")
                );
                response.ValidationErrors = validationEx
                    .Errors.Select(error => new ValidationErrorResponse
                    {
                        PropertyName = error.PropertyName,
                        ErrorMessage = error.Message,
                    })
                    .ToList();
                break;

            case ArgumentNullException ex:
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Message = "Required input is missing";
                response.Details = ex.Message;
                break;

            case InvalidOperationException ex:
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Message = "Invalid operation";
                response.Details = ex.Message;
                break;

            case UnauthorizedAccessException ex:
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                response.Message = "Unauthorized access";
                response.Details = ex.Message;
                break;

            default:
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Message = "An unexpected error occurred";
                response.Details = "Please contact support if the problem persists";
                break;
        }

        var result = JsonSerializer.Serialize(response, _jsonOptions);
        await context.Response.WriteAsync(result);
    }
}

public class ErrorResponse
{
    public string Message { get; set; }
    public string Details { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public List<ValidationErrorResponse> ValidationErrors { get; set; }
}

public class ValidationErrorResponse
{
    public string PropertyName { get; set; }
    public string ErrorMessage { get; set; }
}

public static class ExceptionHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseExceptionHandling(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}
