using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.UI.WebControls.WebParts;
using Denemeee.DataContext;
using Denemeee.Models;
using System.Security.Authentication;
using Microsoft.Ajax.Utilities;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Logging;

namespace Denemeee.Controllers
{


	public class UserController : Controller
	{
		LoggerDbContext loggerDb = new LoggerDbContext();
		AccountDbContext db = new AccountDbContext();
		LogModel logs = new LogModel();
		[HttpGet]
		public ActionResult Index()
		{
			
			return View();

		}


		[NoDirectAccess]
		[HttpPost]

		public ActionResult Index(Account a)
		{
		


			try
			{
				

				var data = db.Accounts.FirstOrDefault(x => x.u_name == a.u_name && x.u_pswd == a.u_pswd);

				
				logs.date = DateTime.Now.ToString()+ " Tarihinde Kullanıcı Giriş Yaptı!!!";
				logs.user_ = data.u_name;
				logs.logmessage = "Aktif";
				logs.güncellenenKayıt ="Güncellenen Kayıt İd: ";
				logs.silinenKayıt = "Silinen Kayıt İd: ";
				logs.yeniKayıt = "Yeni Kayıt İd: ";
				loggerDb.Log.Add(logs);
				loggerDb.SaveChanges();

				//}
				if (data != null)
				{
					FormsAuthentication.SetAuthCookie(data.u_name, false);
					Session["u_name"] = data.u_name.ToString();
					return RedirectToAction("About", "Home");

				}
				else
				{
					return RedirectToAction("Index", "User");
				}
			}
			catch (Exception)
			{
				Response.StatusCode = 400;
				return Json(new { Message = "Lütfen İlgili Alanları doldurun !!  " }, JsonRequestBehavior.AllowGet);
				throw;
			}
		}
		public ActionResult LogOut(Account a)
		{
			try
			{
				int idl = loggerDb.Log.OrderBy(x => x.ides).Count();
				var dat = loggerDb.Log.Where(x => x.ides == idl).FirstOrDefault();
				dat.logmessage = DateTime.Now.ToString()+" Tarihinde Kullanıcı Çıkış Yaptı!!!";
				
				loggerDb.SaveChanges();

				Session.Remove("u_name");
				if (Session["u_name"] == null)
				{

					return RedirectToAction("Index", "User");
				}
				else
				{
					return RedirectToAction("About", "Home");


				}


			}
			catch (Exception)
			{
				Response.StatusCode = 400;
				return Json(new { Message = "Lütfen İlgili Alanları doldurun !!  " }, JsonRequestBehavior.AllowGet);
				throw;
			}







		}
	}
}
