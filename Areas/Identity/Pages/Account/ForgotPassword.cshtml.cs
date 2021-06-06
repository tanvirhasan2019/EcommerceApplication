using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Encodings.Web;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using System.Net.Mail;
using System.Net;

namespace EcommerceApp.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ForgotPasswordModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;

        public ForgotPasswordModel(UserManager<ApplicationUser> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {

                var user = await _userManager.FindByEmailAsync(Input.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToPage("./ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please 
                // visit https://go.microsoft.com/fwlink/?LinkID=532713

                string returnUrl = null;
                returnUrl = returnUrl ?? Url.Content("~/");

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                var callbackUrl = Url.Page(
                    "/Account/ResetPassword",
                    pageHandler: null,
                    values: new { area = "Identity", code },
                    protocol: Request.Scheme);
                Console.WriteLine(" ---------------------------------------");
                Console.WriteLine("PASSWORD LINK IS " + callbackUrl);
                Console.WriteLine(" ---------------------------------------");



                /* var callbackUrl = Url.Page(
                          "/Account/ResetPassword",
                          pageHandler: null,
                          values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                          protocol: Request.Scheme); */
                // Build the password reset link


              /*  await _emailSender.SendEmailAsync(
                    Input.Email,
                    "Reset Password",
                    $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>."); 


                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("tanshen1999@gmail.com", "trpebkphleemdvji"),
                    EnableSsl = true,
                };


                var mailMessage = new MailMessage
                {
                    From = new MailAddress("tanshen1999@gmail.com"),
                    Subject = "Change Password",
                    Body = $"Please change your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.",
                    IsBodyHtml = true,
                }; 

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("tanshen1999@gmail.com"),
                    Subject = "Verify your Tanshenit account",
                    Body = $"Please reset your password by <a href='{callbackUrl}'>clicking here</a>.",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(Input.Email);

                smtpClient.Send(mailMessage); 

                */



                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("tanshen1999@gmail.com", "trpebkphleemdvji"),
                    EnableSsl = true,
                };


                var mailMessage = new MailMessage
                {
                    From = new MailAddress("tanshen1999@gmail.com"),
                    Subject = "Verify your Tanshenit account",
                    Body = $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(Input.Email);

                smtpClient.Send(mailMessage);

                return RedirectToPage("./ForgotPasswordConfirmation");
            }

            return Page();
        }
    }
}
