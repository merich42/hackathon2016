using Microsoft.VisualStudio.TestTools.UnitTesting;
using PayscaleCalc.Controllers;
using System.Web.Mvc;

namespace PayscaleCalc.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index("New York", "NY", "Architect") as ViewResult;

            // Assert
            Assert.IsNotNull(result);


            
        }
    }
}
