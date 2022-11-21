using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Activity
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(60)]
        public string Title { get; set; }
        [MinLength(50)]
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Venue { get; set; }
    }
}
