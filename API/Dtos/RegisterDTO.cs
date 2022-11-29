using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDTO
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{4,8}", ErrorMessage = "Password must be 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}